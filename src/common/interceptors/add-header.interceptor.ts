import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class AddHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const response = context.switchToHttp().getResponse()
        response.setHeader('x-custom-header', "valor do header")

        return next.handle()
    }
    
}