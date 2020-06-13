/**
 * @description 权限 manager
 */

import { CommonManagerInterface } from './interface'
import Authority from '../db/models/authority'

interface AuthorityCreateBody{

}

interface AuthorityUpdateBody extends AuthorityCreateBody{
    id: string;
}

type AuthorityManagerInterface = CommonManagerInterface<AuthorityCreateBody,AuthorityUpdateBody>

class AuthorityManager implements AuthorityManagerInterface{
    getValidateData(data: { [propKey: string]: any }): void {
        throw new Error("Method not implemented.")
    }
    async creat(data: AuthorityCreateBody): Promise<void> {
        const result = await Authority.create(data)
        if(result){
            
        }
    }
    update(data: AuthorityUpdateBody): void {
        throw new Error("Method not implemented.")
    }
    destroy(id: string): void {
        throw new Error("Method not implemented.")
    }
    get(id: string): void {
        throw new Error("Method not implemented.")
    }

}

export default AuthorityManager