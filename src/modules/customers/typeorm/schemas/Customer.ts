import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('customers')
class Customer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  name: string;

  @Column('decimal')
  defaulting_value: number;

  @Column('datetime')
  defaulting_date_start: Date;

  @Column('enum')
  status: 'OK' | 'DEFAULTING';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
