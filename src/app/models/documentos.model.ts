export interface IDocumentos {
  cocDescripcion: string;
  cocEstado: boolean;
  id: number;
  cocNombreDocumento: string;
  cocVigencia: boolean;
  cocVigenciaMaxima: number;
  coclimitLoad: number;
  cocrequiered: boolean;
  codUser: string;
  codUserUpdate: string;
  fechaRegistro: Date;
  fechaRegistroUpdate: Date;
  info: string;
  infoUpdate: string;
  selected: number;
  vigenciaSelected: number;
  vigenciaDate?: Date;
  name: string;
  size: number;
  urlDoc: string;
  prvdUrlDocument: string;
  prvdCodDocumento: number;
}

export interface IDocumentosRegistrados {
  cocDescripcion: string;
  cocNombreDocumento: string;
  cocVigencia: false;
  codUser: string;
  codUserUpdate: string;
  fechaRegistro: Date;
  fechaRegistroUpdate: Date;
  id: number;
  info: string;
  infoUpdate: string;
  prvdCodDocumento: number;
  prvdCodProveedor: number;
  prvdEstadoDocumento: number;
  prvdExtDocument: string;
  prvdNameDocument: string;
  prvdOriginalNameDocument: string;
  prvdSendNotification: boolean;
  prvdSizeDocument: number;
  prvdUrlDocument: string;
  prvdUrlRelDocument: string;
  prvdValidationDocument: false;
}
