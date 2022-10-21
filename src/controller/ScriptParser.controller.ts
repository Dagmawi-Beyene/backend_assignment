import { Request, Response } from "express";
import { getRepository, getTreeRepository, In } from "typeorm";
import { Station } from "../entities/Station";
import { Company } from "../entities/Company";

function getUniqueListBy(arr: any, key: string | number) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()]
} 

export const parseScript = async (req: Request, res: Response) => {
    

    try {
        const script = req.body;
        const scriptArray = script.split(/\r?\n/);
    
        const stationRepository = getRepository(Station);
        const companyRepository = getRepository(Company);

        const stations = await stationRepository.find({
            relations: ["company", "stationType"],
        });
        const companies = await companyRepository.find();

        const result = [];

        let timestamp = new Date();
        let companyArray: any[] = []

        for (let i = 0; i < scriptArray.length; i++) {
            const command = scriptArray[i];
            const commandArray = command.split(" ");

            if (commandArray[0] === "Begin") {
                const obj = {
                    step: "Begin",
                    timestamp: timestamp,
                    companies: [],
                    totalChargingStations: [],
                    totalChargingPower: 0

                }
                result.push(obj);

            } else if(commandArray[0] === "End"){
                const obj = {
                    step: "End",
                    timestamp: timestamp,
                    companies: [],
                    totalChargingStations: [],
                    totalChargingPower: 0
                }
                result.push(obj);
            } else if (commandArray[0] === "Start") {

                if (commandArray[1] === "station") {
                    if (commandArray[2] === "all") {
                        let power = 0;
                        //calculate total charging power based on station types
                        stations.forEach(station => {
                            power += station.stationType.maxPower;
                        });

                        //get all station ids
                        const stationIds = stations.map(station => station.id);

                        const obj = {
                            step: "Start station all",
                            timestamp: timestamp,
                            companies: companies,
                            totalChargingStations: stationIds,
                            totalChargingPower: power
                        }
                        result.push(obj);

                     
                    } else {
                        const station = await stationRepository.find({
                            relations: ["company", "stationType"],
                            where: { name: "Station " + commandArray[2] }
                        });

                        const ancestors = await getTreeRepository(Company).findAncestorsTree(station[0].company);

                        console.log(companyArray)
                        const company = [ancestors.parentCompany, station[0].company].concat(companyArray).map(company => {
                            // if it exists in the array, return the object merged with the new data
                           const found = companyArray.find((item: any) => item.id === company.id);
                            if (found && ancestors.parentCompany.id === company.id) {
                                return {
                                    id: company.id,
                                    chargingStations: [...found.chargingStations, station[0].id],
                                    chargingPower: found.chargingPower + station[0].stationType.maxPower
                                }
                             
                            }
                    
                            return {
                                id: company.id,
                                chargingStations: [station[0].id],
                                chargingPower: 10
                            }
                        });
                     
                        companyArray = [...companyArray, ...company];
                        const comp = getUniqueListBy(companyArray, 'id')


                        const chargingStations = comp?.map((item: any) => item.chargingStations)?.flat();
                        let uniqueStations = [...new Set(chargingStations)];
                      

                        const obj = {
                            step: "Start station " + commandArray[2],
                            timestamp: timestamp,
                            companies: comp,
                            totalChargingStations: uniqueStations,
                            totalChargingPower: uniqueStations.length * 10

                        }
                        result.push(obj);

                    }
                } 
          
            }else if (commandArray[0] === "Stop") {
                    
                if (commandArray[1] === "station") {
                    if (commandArray[2] === "all") {
                        const obj = {
                            step: "Stop station all",
                            timestamp: timestamp,
                            companies: [],
                            totalChargingStations: [],
                            totalChargingPower: 0

                        }
                        result.push(obj);
                    } else {
                        const station = await stationRepository.find({
                            relations: ["company"],
                            where: { name: "Station " + commandArray[2] }
                        });
                        // remove company from company array
                        const ind = companyArray.findIndex(company => company.id === station[0].company.id);
                        companyArray.splice(ind, 1);

                        const comp = getUniqueListBy(companyArray, 'id')
                        // remove station from started stations
                        const chargingStations = companyArray?.map((item: any) => item.chargingStations)?.flat();
                        let uniqueStations = [...new Set(chargingStations)];

                        const obj = {
                            step: "Stop station " + commandArray[2],
                            timestamp: timestamp,
                            companies: comp,
                            totalChargingStations: uniqueStations,
                            totalChargingPower: uniqueStations.length * 10

                        }
                        result.push(obj);
                    }
                }
            } else if (commandArray[0] === "Wait") {
                let timeObject = new Date();
                let milliseconds = parseInt(commandArray[1]) * 1000; 
                timestamp = new Date(timeObject.getTime() + milliseconds);
            }
          
        }
        res.status(200).send({
            "success": true,
            "statusCode": 200,
            "message": "Script parsed successfully",
            "data": result
        });
    } catch (error) {
      
        res.status(500).send({
            "success": false,
            "statusCode": 500,
            "message": error.message,
            "data": null
        });
    }
}
