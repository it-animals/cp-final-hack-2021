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
  name: name;
  descr: string;
  cases: string;
  profit: string;
  status: ProjectStatus;
  type: ProjectTypesType;
  for_transropt: ProjectForTransportType;
  certification: ProjectCertificationType;
};
