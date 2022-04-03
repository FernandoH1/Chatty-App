import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Login from "../pages/Login";


jest.mock('../helpers/auth', ()=> 
({
    signin:  jest.fn(),
    signInWithGoogle: jest.fn(),
    signInWithGitHub: jest.fn()
}))

configure({adapter: new Adapter()});

const wrapper =  shallow(
        <Login></Login>
)

test("login directly process test", ()=>
{
    wrapper.find("#form-login").simulate("submit", 
    {
        preventDefault: ()=>{}
    });
    expect(signin).toHaveBeenCalled();
});

test("login with google process test", ()=>
{
    wrapper.find("#sign-in-with-google").simulate("click");
    expect(signInWithGoogle).toHaveBeenCalled();
})

test("login with github process test", ()=>
{
    wrapper.find("#sign-in-with-github").simulate("click");
    expect(signInWithGitHub).toHaveBeenCalled();
})