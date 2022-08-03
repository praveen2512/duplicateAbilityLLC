import { Button, toaster, TextInputField, FilePicker } from 'evergreen-ui';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import styled from 'styled-components';

import Logo from './logo.svg'

const ApplyJobForm = () => {
    const { register, handleSubmit } = useForm();
    // const onSubmit = (data) => console.log(data)
    const onSubmit = (data) => {
        console.log(`data : ${JSON.stringify(data)}`);
        const request = {
            email_address: data?.['ApplyJobEmail']
        };
        Axios.post(`http://54.158.12.53:9900/v1/api/generate-OTP`, request)
            .then(res => toaster.notify("OTP Sent your email address"))
            .catch(e => toaster.warning('Something went wrong'))
    }
    return (
        <Wrapper>
            <Section className='main-wrapper'>
                <div className='container section'>
                    <div className='row'>

                        <div className='col-md-12 d-flex justify-content-center'>
                            <img src={Logo} alt="Ability" />
                        </div>

                        <div className='col-md-12 d-flex justify-content-center'>
                            <H3 className="text-primary" style={{ color: "#50A656 !important" }} >Ability Options Job Applicaton Form</H3>
                        </div>

                        <div className='col-md-12 d-flex justify-content-center'>
                            <p style={{fontSize: "1rem"}} >We are an equal opportunity employer, dedicated to a policy of non-discrimination in employment on any basis including race, color, national origin, age, sex, religion, disability status, marital status, protected veteran status, or any other characteristic protected by law. The following characters cannot be used on this form (%,&amp;,/,?,&gt;,&lt;,|,{`{,}`})</p>
                        </div>

                        <div className='col-md-12 d-flex justify-content-center'>
                            <Card>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextInputField
                                        ref={register({ minLength: 3, required: true })}
                                        name='ApplyJobEmail'
                                        label="ApplyJobEmail"
                                        placeholder="Email"
                                        marginTop='0.2em'
                                        width='100%'
                                        required
                                    />
                                    <Button
                                        appearance='primary'
                                        intent='success'
                                        marginTop='2em'
                                        height={36}>
                                        Submit
                                    </Button>
                                </form>
                            </Card>
                        </div>

                    </div>

                </div>
            </Section>
        </Wrapper>
    )
}

export default ApplyJobForm

const Wrapper = styled.div`
background-color: #f7f7f7 !important;
min-height: 100vh;
`

const Section = styled.div`
    display: flex;
    align-items: center;
    background-color: #f7f7f7 !important;
    min-height: 100vh;
    padding-top: 6em;
    padding-bottom: 6em;
`

const H3 = styled.h3`
    color: #50A656 !important;
    font-size: 1.75rem;
`

const Card = styled.div`
    background-color: #ffffff;
    width: 400px;
    padding: 1rem;
    margin-bottom: 0;
    -webkit-box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
    border-radius: 5px;
`