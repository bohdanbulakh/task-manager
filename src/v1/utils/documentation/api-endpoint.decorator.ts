import { applyDecorators, Param, Type, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LocalGuard } from '../../security/guards/local.guard';
import { makeArray } from '../globals';

type Param = {
  name: string;
  description: string;
}

type ApiEndpointParams = {
  summary: string;
  params?: Param | Param[];
  guards?: any | any[];
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

  if (body) decorators.push(ApiBody({ type: body }));

  if (badRequestResponse) decorators.push(ApiBadRequestResponse({
    description: badRequestResponse,
  }));

  if (params) {
    decorators.push(...makeArray(params).map((param) => ApiParam(param)));
  }

  return applyDecorators(...decorators);
};
