import { render, screen } from "@testing-library/react"
import Hotels from "../components/hotels/Hotels"

describe('Skills', ()=>{
    
    test('renders correctly', ()=>{
        const view = render(<Hotels />)
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