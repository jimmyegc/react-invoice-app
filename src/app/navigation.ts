import type { ComponentType, SVGProps } from 'react';
import { 
  MdPeople,        // Material Design – Clientes
  MdLocationCity,  // Material Design – Ciudades
  MdFlag,          // Material Design – Estados
  MdPublic,        // Material Design – Países
  MdReceipt,       // Material Design – Facturas
  MdSettings       // Material Design – Configuración
} from 'react-icons/md';

interface MenuItem {
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
}

export const navigation: MenuItem[] = [
  { label: 'Clientes', path: '/clients', icon: MdPeople },
  { label: 'Ciudades', path: '/cities', icon: MdLocationCity },
  { label: 'Estados', path: '/states', icon: MdFlag },
  { label: 'Países', path: '/countries', icon: MdPublic },
  { label: 'Facturas', path: '/invoices', icon: MdReceipt },
  { label: 'Configuración', path: '/settings', icon: MdSettings },
];
