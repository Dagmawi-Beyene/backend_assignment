import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from 'typeorm';
import { Company } from './Company';
import { StationType } from './StationType';


@Entity('tbl_station')
export class Station extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ unique: true })
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Company, company => company.stations)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@OneToOne(() => StationType)
	stationType: StationType;

}









