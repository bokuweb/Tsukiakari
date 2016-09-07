/* @flow */

export type Tweet = {
  contributors: any;
  coordinates: any;
  created_at: string;
  entities: Object;
  extended_entities: Object;
  favorite_count: number;
  favorited: bool;
  geo: any;
  id: number;
  id_str: string;
  in_reply_to_screen_name: ?string;
  In_reply_to_status_id: ?number;
  in_reply_to_status_id_str: ?string;
  in_reply_to_user_id: ?number;
  in_reply_to_user_id_str: ?string;
  is_quote_status: bool;
  lang: string;
  metadata: Object;
  place: any;
  possibly_sensitive: bool;
  retweet_count: number;
  retweeted: bool;
  retweeted_status: Object;
  source: string;
  text: string;
  truncated: bool;
  user: Object;
  statuses_count: number;
};
