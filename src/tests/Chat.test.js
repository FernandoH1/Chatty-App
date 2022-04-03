import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {ref} from '@firebase/database';
import Chat from "../pages/Chat";

jest.mock('../services/firebase', ()=> 
({
    db: jest.fn()
}))
jest.mock('@firebase/database', ()=> 
({
    ref: jest.fn()
}))
configure({adapter: new Adapter()});

const wrapper =  shallow(
        <Chat></Chat>
)

test("send message to chat process test", ()=>
{
    wrapper.find("#send-message").simulate("submit",
    {
        preventDefault: () =>{}
    });

    expect(ref).toHaveBeenCalled();
});