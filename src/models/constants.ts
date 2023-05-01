export const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Zа-яА-Я]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d\-,.%;№"&*^)(!~]+$/;

// export const badWordsRegex =
//   /([хx][уy])(?:[ёieеюийя]|ли[^а-я])|([пp][iие][3зс][дd])|(?:[^а-я]|(вы))([bб][lл][yя])|(?:[^а-я]|[^(колр)])((?:[еeё]|йо)[бb](?:[нn][уy]|[uу][4ч]|[оoаa@][тnкнt]|[лске@eыиаa][наоюи@вл]))|([pп][иeеi][дd][oоаыa@еeиi][рr])|[^а-я]([cсs][yуu][ч4]?[kк][a@аи])/i;
export const badWordsRegex =
  /(?:https?:\/\/)?(?:[a-z]+\.)?[a-z]+\.(?:com|net|org|ru|рф|io|co|gl|me|ly|to|us|biz|info|name|online|site|xyz|store|tech|club|world|space|blog|life|today|news|top|live|win|work|email|company|design|store|media)(?:\/\S*)?|([хx][уy])(?:[ёieеюийя]|ли[^а-я])|([пp][iие][3зс][дd])|(?:[^а-я]|(вы))([bб][lл][yя])|(?:[^а-я]|[^(колр)])((?:[еeё]|йо)[бb](?:[нn][уy]|[uу][4ч]|[оoаa@][тnкнt]|[лске@eыиаa][наоюи@вл]))|([pп][иeеi][дd][oоаыa@еeиi][рr])|[^а-я]([cсs][yуu][ч4]?[kк][a@аи])/i;

export enum Url {
  BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0',
  PATH_FIND = '/find',
  PATH_FAVORITE= '/favorite',
  PATH_SECURITY = '/security',
  PATH_VACANCIES = '/vacancies/',
  PATH_AUTH= '/oauth2/password/',
  PATH_CATALOGUES= '/catalogues/',
  PATH_VACANCY ='/vacancy',
}


