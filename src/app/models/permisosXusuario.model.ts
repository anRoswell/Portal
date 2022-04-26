export interface IPermisosXUsuario {
  pxu_IdPerfilesXUsuarios: number;
  pxu_Usr_CodUsuario: number;
  pxu_Apl_CodAplicacion: number;
  pxu_Prf_CodPerfil: string;
  men_IdMenu: number;
  Men_Controlador: string;
  Men_Accion: string;
  men_Modulo_Descripcion: string;
  men_Tusr_CodTipoUsuario: number;
  tusr_Descripcion: string;
  pmp_Leer: boolean;
  pmp_Editar: boolean;
  pmp_Grabar: boolean;
  pmp_Borrar: boolean;
}
