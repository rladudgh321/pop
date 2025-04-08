import { Metadata } from 'next';
import MachinesClient from './machinesClient';

export const metadata: Metadata = {
    title: '기계 대여 소개',
    description: '그린농장 기계 대여 소개입니다.',
  };

export default function MachinesPage() {
  return <MachinesClient />;
}