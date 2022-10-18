import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	Tree,
	TreeChildren,
	TreeParent,
	OneToMany,
} from 'typeorm';
import { Station } from './Station';


@Entity('tbl_company')
@Tree("closure-table")
export class Company extends BaseEntity{
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;

	@TreeParent()
	parentCompany: Company;

	@TreeChildren()
	childCompanies: Company[];

	@OneToMany(() => Station, station => station.company)
	stations: Station[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}