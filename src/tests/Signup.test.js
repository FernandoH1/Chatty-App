import { signup } from "../helpers/auth";
import {shallow, configure} from "enzyme";
import SignUp from "../pages/Signup";
import Adapter from 'enzyme-adapter-react-16';


jest.mock('../helpers/auth', ()=> 
({
    signup: jest.fn()
}))

configure({adapter: new Adapter()});

const wrapper =  shallow(
        <SignUp></SignUp>
)

test("sign up process test", ()=>
{
    wrapper.find("#form-register").simulate("submit", 
    {
        preventDefault: ()=>{}
    });
    expect(signup).toHaveBeenCalled();
});