import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class TimingConnectionInterceptor implements NestInterceptor {
     async intercept(context: ExecutionContext, next: CallHandler<any>){
        
    }
    
}