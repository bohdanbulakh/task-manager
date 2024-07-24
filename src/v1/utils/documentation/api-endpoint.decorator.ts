import { applyDecorators, Param, Type, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LocalGuard } from '../../security/guards/local.guard';
import { makeArray } from '../globals';
import { Permissions } from '../../security/permissions';
import { JwtGuard } from '../../security/guards/jwt.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { SetPermissions } from '../../security/decorators/permissions.decorator';

type Param = {
  name: string;
  description: string;
}

type ApiEndpointParams = {
  summary: string;
  params?: Param | Param[];
  guards?: any | any[];
  permissions?: Permissions | Permissions[],
  authType?: any | any [];
  body?: Type<object>;
  okResponse: Type<object>;
  badRequestResponse?: string;
}

export const ApiEndpoint = (
  {
    summary,
    okResponse,
    guards,
    permissions,
    body,
    badRequestResponse,
    params,
    authType = ApiBearerAuth,
  }: ApiEndpointParams
) => {
  const decorators = [
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  ];

  if (guards) {
    guards = makeArray(guards);
    if (!guards.includes(LocalGuard)) {
      decorators.push(...(makeArray(authType).map(
        (authDecorator: any) => authDecorator())
      ));
    }
    decorators.push(UseGuards(...guards));
  }

  if (permissions) {
    decorators.push(
      UseGuards(JwtGuard, PermissionGuard),
      applyDecorators(SetPermissions(permissions), ApiBearerAuth())
    );
  }

  if (body) decorators.push(ApiBody({ type: body }));

  if (badRequestResponse) decorators.push(ApiBadRequestResponse({
    description: badRequestResponse,
  }));

  if (params) {
    decorators.push(...makeArray(params).map((param) => ApiParam(param)));
  }

  return applyDecorators(...decorators);
};
