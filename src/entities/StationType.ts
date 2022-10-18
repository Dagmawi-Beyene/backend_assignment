
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	OneToOne
} from 'typeorm';
import { Station } from './Station';

@Entity('tbl_station_type')
export class StationType extends BaseEntity{
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	maxPower: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}