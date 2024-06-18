import { applyDecorators, Param, Type, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

type Param = {
  name: string;
  description: string;
}

type ApiEndpointParams = {
  summary: string;
  params?: Param | Param[];
  guards?: any | any[];
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
  }: ApiEndpointParams
) => {
  const decorators = [
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  ];

  if (guards) {
    guards = Array.isArray(guards) ? guards : [guards];
    decorators.push(UseGuards(...guards));
  }

  if (body) decorators.push(ApiBody({ type: body }));

  if (badRequestResponse) decorators.push(ApiBadRequestResponse({
    description: badRequestResponse,
  }));

  if (params) {
    params = (!Array.isArray(params)) ? [params] : params;
    decorators.push(...params.map((param) => ApiParam(param)));
  }

  return applyDecorators(...decorators);
};
