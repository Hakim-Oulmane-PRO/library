
export class JsonResponse {
  constructor(
    public status: string,
    public errorMsg: string,
    public errorCode: string,
    public data: object,
  ) {}
}
