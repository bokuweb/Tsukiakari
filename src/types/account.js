/* @flow */

export type Account = {
  accessToken: string;
  accessTokenSecret: string;
  followers_count: number;
  friends_count: number;
  id: number;
  id_str: string;
  name: string;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  screen_name: string;
  status: Object;
  statuses_count: number;
};
