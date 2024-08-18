import { render, screen } from "@testing-library/react"
import Login from "../../../clients/src/components/login/Login"

describe('Skills', ()=>{
    
    test('renders correctly', ()=>{
        const view = render(<Login />)
        // logRoles(view)
        // const h2Elem = screen.getByRole('heading', {
        //     level: 2
        // })
        const buttonElem = screen.getByRole('button');

        expect(buttonElem).toBeInTheDocument()
        // const listElem = screen.getByRole('list')
        // expect(listElem).toBeInTheDocument()
    })

    
    
})