/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common search params */
    export type SearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    export type EPaginatingSearchParams<T = any> = Pick<Common.PaginatingCommonParams, 'page' | 'size'> & T;

    /** common page search params */
    export type PaginatingSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** common delete params */
    export type DeleteParams = { id: number | string };

    /** common batch delete params */
    export type BatchDeleteParams = { ids: number[] | string[] };

    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      page: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
      /** 适配 Continew */
      list: T[];
    }

    /**
     * enable status
     *
     * - "0": disabled
     * - "1": enabled
     * - "2": unknow
     */
    type EnableStatus = '0' | '1' | '2';
    type DeleteStatus = '0' | '1';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id?: number | string;
      /** record creator */
      createBy?: string;
      createUser?: string;
      /** record create time */
      createTime?: string;
      /** record updater */
      updateBy?: string;
      updateUser?: string;
      /** record update time */
      updateTime?: string;
      /** record status */
      status?: EnableStatus | null;
      isDelete?: DeleteStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      id?: string;
      avatar?: string;
      userId?: string;
      userName: string;
      nickname?: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
      /** role home */
      roleHome: string;
    }>;

    /** role add params */
    type RoleAddParams = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'roleDesc' | 'roleHome' | 'status'>;

    /** role update params */
    type RoleUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Role, 'id'>> & RoleAddParams;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & Api.Common.PaginatingSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** role authorized */
    type RoleAuthorized = Api.SystemManage.Role & { menuIds: number[]; apiIds: number[]; buttonIds: number[] };

    /** get role authorized params */
    type RoleAuthorizedParams = Pick<Api.SystemManage.RoleAuthorized, 'id'>;

    /** role authorized list */
    type RoleAuthorizedList = CommonType.RecordNullable<RoleAuthorized>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '0' | '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** user add params */
    type UserAddParams = Pick<
      Api.SystemManage.User,
      'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'userRoles' | 'status'
    >;

    /** user update params */
    type UserUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.User, 'id'>> & UserAddParams;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'> &
        Api.Common.PaginatingSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    type MenuAddParams = Pick<
      Api.SystemManage.Menu,
      | 'menuType'
      | 'menuName'
      | 'routeName'
      | 'routePath'
      | 'component'
      | 'order'
      | 'i18nKey'
      | 'icon'
      | 'iconType'
      | 'status'
      | 'parentId'
      | 'keepAlive'
      | 'constant'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
    > & {
      query: NonNullable<Api.SystemManage.Menu['query']>;
      buttons: NonNullable<Api.SystemManage.Menu['buttons']>;
      layout: string;
      page: string;
      pathParam: string;
    };

    /** menu update params */
    type MenuUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'id'>> & MenuAddParams;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };

    // Message ----------------------------------------------------------------------------------------------------------------
    type MessageType = 0 | 1 | 2;
    type MessageTagType = import('naive-ui/es/tag/src/Tag').TagProps['type'];

    type Message = Common.CommonRecord<{
      title: string;
      type: MessageType | null;
      icon?: string;
      tagTitle?: string;
      tagType?: MessageTagType;
      isRead?: boolean;
      description?: string;
      date?: string;
    }>;

    type MessageSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Message, 'title' | 'type' | 'tagTitle' | 'tagType' | 'isRead' | 'date'> &
        Api.Common.PaginatingSearchParams
    >;

    type MessageList = Common.PaginatingQueryRecord<Message>;

    // Dict ----------------------------------------------------------------------------------------------------------------
    type DictRoot = 0 | 1;

    type Dict = Common.CommonRecord<{
      code: string;
      label: string;
      isRoot: boolean;
      value: number | null;
    }>;

    type DictSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Dict, 'code' | 'label' | 'isRoot'> & Api.Common.PaginatingSearchParams
    >;

    type DictList = Common.PaginatingQueryRecord<Dict>;

    /**
     * api method
     *
     * - "1": "GET"
     * - "2": "POST"
     * - "3": "PUT"
     * - "4": "PATCH"
     * - "5": "DELETE"
     */
    type methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

    /** api */
    type Api = Common.CommonRecord<{
      /** api path */
      path: string;
      /** api method */
      method: methods;
      /** api summary */
      summary: string;
      /** api tags name */
      tags: string;
    }>;

    /** api add params */
    type ApiAddParams = Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'>;

    /** api update params */
    type ApiUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Api, 'id'>> & ApiAddParams;

    /** api search params */
    type ApiSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'> & Api.Common.PaginatingSearchParams
    >;

    /** api list */
    type ApiList = Common.PaginatingQueryRecord<Api>;

    /**
     * log type
     *
     * - "1": "ApiLog"
     * - "2": "UserLog"
     * - "3": "AdminLog"
     * - "4": "SystemLog"
     */
    type logTypes = '1' | '2' | '3' | '4';

    /**
     * api method
     *
     * - "1": "GET"
     * - "2": "POST"
     * - "3": "PUT"
     * - "4": "PATCH"
     * - "5": "DELETE"
     */
    type logDetailTypes =
      | '1101'
      | '1102'
      | '1201'
      | '1202'
      | '1203'
      | '1211'
      | '1212'
      | '1213'
      | '1301'
      | '1302'
      | '1303'
      | '1311'
      | '1312'
      | '1313'
      | '1314'
      | '1315'
      | '1401'
      | '1402'
      | '1403'
      | '1404'
      | '1411'
      | '1412'
      | '1413'
      | '1414'
      | '1415'
      | '1501'
      | '1502'
      | '1503'
      | '1504'
      | '1505'
      | '1506'
      | '1507'
      | '1511'
      | '1512'
      | '1513'
      | '1514'
      | '1515'
      | '1601'
      | '1611'
      | '1612'
      | '1613'
      | '1614'
      | '1615';

    /** log */
    type Log = Common.CommonRecord<{
      /** log type */
      logType: logTypes;
      /** log user */
      logUser: string;
      /** log detail */
      logDetailType: logDetailTypes | null;
      /** request url */
      requestUrl: string;
      /** create time */
      createTime: string;
      /** create time */
      responseCode: string;
    }>;

    /** log add params */
    type LogAddParams = Pick<
      Api.SystemManage.Log,
      'logType' | 'logUser' | 'logDetailType' | 'requestUrl' | 'createTime' | 'responseCode'
    >;

    /** log update params */
    type LogUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Log, 'id'>> & Api.SystemManage.LogAddParams;

    /** log search params */
    type LogSearchParams = CommonType.RecordNullable<
      Pick<
        Api.SystemManage.Log,
        'logType' | 'logUser' | 'logDetailType' | 'requestUrl' | 'createTime' | 'responseCode'
      > &
        Api.Common.PaginatingSearchParams & { timeRange: string }
    >;

    /** log list */
    type LogList = Common.PaginatingQueryRecord<Log>;
  }
}
