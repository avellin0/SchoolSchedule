import {CreateUser} from "@back/controller/CreateUser"
import {describe, expect, it, vi} from "vitest"


describe("It should ensure that the user is creating", () => {
   
    it("Should unsure that the user is create exactaly as i want", async() => {    
        const user = {name: "Davi", email: "DaviPikaDasGalaxias@gmail.com",password: 1234, permissions: "user"}
        
        const response = new CreateUser()
        const result = response.handle

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(user)
        }))


    
        // expect(result).toEqual(user)
})
})