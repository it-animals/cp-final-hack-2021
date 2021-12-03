/**
 * 1.    да, требуется сертификация и у нас она есть;
 * 2.    да, требуется сертификация, но у нас ее нет;
 * 3.    нет, не требуется;
 */

export type ProjectCertificationType = 1 | 2 | 3;

/**
 * 1.    Московский метрополитен;
 * 2.    мосгорстранс;
 * 3.    ЦОДД;
 * 4.    Организатор перевозок;
 * 5.    Мостранспроект;
 * 6.    АМПП;
 */
export type ProjectForTransportType = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 1.    Доступный и комфортный городской транспорт;
 * 2.    Новые виды мобильности;
 * 3.    Безопасность дорожного движения;
 * 4.    Здоровые улицы и экология;
 * 5.    Цифровые технологии в транспорте
 */
export type ProjectTypesType = 1 | 2 | 3 | 4 | 5;

/**
 * 1.    Идея
 * 2.    Прототип
 * 3.    Продукт
 * 4.    Закрыт
 * 5.    Внедрение
 */
export type ProjectStatus = 1 | 2 | 3 | 4 | 5;

export type ProjectType = {
  id: id;
  name: string;
  descr: string;
  cases: string;
  profit: string;
  status: ProjectStatus;
  type: ProjectTypesType;
  tags: { id: string; name: string }[];
  for_transport: ProjectForTransportType;
  certification: ProjectCertificationType;
  teams: { fio: string; is_owner: boolean; email: string }[];
  projectFiles: {
    id: number;
    project_id: number;
    name: string;
    extension: string;
    content: string;
    url: string;
  }[];
};

const certCatalog = {
  1: "Нужна, присутствует",
  2: "Нужна, отсутствует",
  3: "Нет",
};

const forProjectCatalog = {
  1: "Московский метрополитен",
  2: "Мосгорстранс",
  3: "ЦОДД",
  4: "Организатор перевозок",
  5: "Мостранспроект",
  6: "АМПП",
};

const typeCatalog = {
  1: "Доступный и комфортный городской транспорт",
  2: "Новые виды мобильности",
  3: "Безопасность дорожного движения",
  4: "Здоровые улицы и экология",
  5: "Цифровые технологии в транспорте",
};

const statusCatalog = {
  1: "Идея",
  2: "Прототип",
  3: "Продукт",
  4: "Закрыт",
  5: "Внедрение",
};

export const getForProjectById = (id: keyof typeof forProjectCatalog) =>
  forProjectCatalog[id];

export const getCertProjectById = (id: keyof typeof certCatalog) =>
  certCatalog[id];

export const getStatusProjectById = (id: keyof typeof statusCatalog): string =>
  statusCatalog[id];

export const getTypeProjectById = (id: keyof typeof typeCatalog): string =>
  typeCatalog[id];
