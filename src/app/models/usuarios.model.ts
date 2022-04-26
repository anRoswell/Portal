export interface IUsuarios {
  usrIdUsuario: number;
  usrCedula: string;
  usrTusrCodTipoUsuario: string;
  usrNombres: string;
  usrApellidos: string;
  usrEmail: string;
  usrPassword: string;
  usrEmpresaProceso: number;
  usrTmpSuspendido: boolean;
  usrEstado: boolean;
  CodUser: number;
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
  prfNombrePerfil: string;
  usrForcePasswordChange: boolean;
}
