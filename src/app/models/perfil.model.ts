export interface IPerfil {
  codArchivo: string;
  codUser: string;
  codUserUpdate: string;
  fechaRegistro: Date;
  fechaRegistroUpdate: Date;
  id: number;
  info: string;
  infoUpdate: string;
  perfilesXusuarios: [];
  prfAdministrador: boolean;
  prfEstado: boolean;
  prfNombrePerfil: string;
}
