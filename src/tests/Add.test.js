import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import { Add } from '../home/Add.js'


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
const postNewVenueActionMock = jest.fn();
const submitButtonMock = jest.fn();

function render() {
  return shallow(
    <Add
      postNewVenueAction={postNewVenueActionMock}
    />
  )
}

function renderSubmit(){
  return shallow(
    <Button onClick={submitButtonMock} />
  )
}

describe('Component: Add', () => {
  it('renders without exploding', () => {
    const add = render();
  })

  it('shows correct header', () => {
    const w = render();
    const heading = w.find('.add-form-heading');
    expect(heading.text()).toEqual("Add a New Happy Hour Spot!");
  })

  it('sets venue_name correctly', () => {
    const w = render();
    const nameField = w.find('.name-field');
    nameField.simulate('change', { target: { value: 'bar' } });
    expect(w.state().name).toEqual('bar');
  })

  it('calls postNewVenueAction with correct data', () => {
    const w = render();
    const nameField = w.find('.name-field');
    nameField.simulate('change', { target: {value: 'foo name'} })
    const addressField = w.find('.address-field');
    addressField.simulate('change', { target: {value: 'foo addresss'} })
    const cityField = w.find('.city-field');
    cityField.simulate('change', { target: {value: 'foo city'} })
    const stateField = w.find('.state-field');
    stateField.simulate('change', { target: {value: 'foo state'} })
    const zipcodeField = w.find('.zipcode-field');
    zipcodeField.simulate('change', { target: {value: 'foo zipcode'} })
    // const neighborhoodField = w.find('.neighborhood-field');
    // neighborhoodField.simulate('change', { data: {value: 'foo neighborhood'} })
    const phoneField = w.find('.phone-field');
    phoneField.simulate('change', { target: {value: 'foo phone'} })
    const mondaySpecialField = w.find('.monday-special-field');
    mondaySpecialField.simulate('change', { target: {value: 'foo mondaySpecial'} })
    const mondayTimeField = w.find('.monday-time-field');
    mondayTimeField.simulate('change', { target: {value: 'foo mondayTime'} })
    const tuesdaySpecialField = w.find('.tuesday-special-field');
    tuesdaySpecialField.simulate('change', { target: {value: 'foo tuesdaySpecial'} })
    const tuesdayTimeField = w.find('.tuesday-time-field');
    tuesdayTimeField.simulate('change', { target: {value: 'foo tuesdayTime'} })
    const wednesdaySpecialField = w.find('.wednesday-special-field');
    wednesdaySpecialField.simulate('change', { target: {value: 'foo wednesdaySpecial'} })
    const wednesdayTimeField = w.find('.wednesday-time-field');
    wednesdayTimeField.simulate('change', { target: {value: 'foo wednesdayTime'} })
    const thursdaySpecialField = w.find('.thursday-special-field');
    thursdaySpecialField.simulate('change', { target: {value: 'foo thursdaySpecial'} })
    const thursdayTimeField = w.find('.thursday-time-field');
    thursdayTimeField.simulate('change', { target: {value: 'foo thursdayTime'} })
    const fridaySpecialField = w.find('.friday-special-field');
    fridaySpecialField.simulate('change', { target: {value: 'foo fridaySpecial'} })
    const fridayTimeField = w.find('.friday-time-field');
    fridayTimeField.simulate('change', { target: {value: 'foo fridayTime'} })
    const saturdaySpecialField = w.find('.saturday-special-field');
    saturdaySpecialField.simulate('change', { target: {value: 'foo saturdaySpecial'} })
    const saturdayTimeField = w.find('.saturday-time-field');
    saturdayTimeField.simulate('change', { target: {value: 'foo saturdayTime'} })
    const sundaySpecialField = w.find('.sunday-special-field');
    sundaySpecialField.simulate('change', { target: {value: 'foo sundaySpecial'} })
    const sundayTimeField = w.find('.sunday-time-field');
    sundayTimeField.simulate('change', { target: {value: 'foo sundayTime'} })

    const button = w.find('.submit-button');
    button.simulate('click');
    test(postNewVenueActionMock, () => expect(postNewVenueActionMock.calls).toBe(1));
    test(postNewVenueActionMock, () => expect(postNewVenueActionMock.toBeCalledWith([{venue_name: 'foo name'}, {address: 'foo address'}, {city: 'foo city'}, {state: 'foo state'}, {zipcode: 'foo zipcode'}, {phone_number: 'foo phone'}, {mondaySpecial: 'foo mondaySpecial'}, {mondayTime: 'foo mondayTime'}, {tuesdaySpecial: 'foo tuesdaySpecial'}, {tuesdayTime: 'foo tuesdayTime'}, {wednesdaySpecial: 'foo wednesdaySpecial'}, {wednesdayTime: 'foo wednesdayTime'}, {thursdaySpecial: 'foo thursdaySpecial'}, {thursdayTime: 'foo thursdayTime'}, {fridaySpecial: 'foo fridaySpecial'}, {fridayTime: 'foo fridayTime'}, {saturdaySpecial: 'foo saturdaySpecial'}, {saturdayTime: 'foo saturdayTime'}, {sundaySpecial: 'foo sundaySpecial'}, {sundayTime: 'foo sundayTime'}])))

  })

  it('invokes onClick prop when clicked', () => {
    const w = render();
    const button = w.find('.submit-button')
    button.simulate('click')
    test(submitButtonMock, () => expect(submitButtonMock.calls.length).toBe(1));
  })

})
