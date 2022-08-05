import { useState } from "react";
import { Button, toaster, TextInputField, FilePicker } from 'evergreen-ui';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import styled from 'styled-components';

import './styles.css';

import Logo from './logo.svg'

const ApplyJobForm = () => {
    const { register, handleSubmit, getValues } = useForm();

    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const onSubmit = (data) => {
        sendOTP(data?.['ApplyJobEmail']);
    }

    const sendOTP = async () => {
        const email = getValues('ApplyJobEmail');
        try {
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let responseData = await (await Axios.post(`http://54.158.12.53:9900/v1/api/employee/${email}/minAccount`, {}, headerConfig)).data;
            if (responseData) {
            }
            const request = {
                email_address: email
            };
            Axios.post(`http://54.158.12.53:9900/v1/api/generate-OTP`, request)
                .then(res => {
                    toaster.notify("OTP Sent your email address");
                    setShowOtpScreen(true);
                })
                .catch(e => toaster.warning('Something went wrong'))
        } catch (error) {

        }
    }

    const onSubmitOTP = (data) => {
        const request = {
            email_address: data?.['ApplyJobEmail'],
            one_time_passcode: data?.['otp']
        };
        Axios.post(`http://54.158.12.53:9900/v1/api/authenticate-OTP`, request)
            .then(res => {
                // toaster.notify("OTP Sent your email address");
                // setShowOtpScreen(true);
                if (res.data && res.data) {
                    if (res.data?.['is_onetime_passcode_valid']) {
                        const enc = window.btoa(`email=${data?.['ApplyJobEmail']}`);
                        window.location.replace(`http://54.158.12.53:3000/onboard?p=${enc}`);
                    }
                    else {
                        toaster.warning("Wrong OTP!");
                    }
                }
                else {
                    toaster.warning("Something went wrong!");
                }

            })
            .catch(e => toaster.warning('Something went wrong'))
    }

    return (
        <div className='formContainer' >
            <div className='formWrapper' >
                <img src={Logo} alt="Ability" />
                <h3 className="text-primary" style={{ color: "#50A656 !important" }} >Ability Options Job Applicaton Form</h3>
                <p style={{ fontSize: "0.9rem", textAlign: 'center' }} >We are an equal opportunity employer, dedicated to a policy of non-discrimination in employment on any basis including race, color, national origin, age, sex, religion, disability status, marital status, protected veteran status, or any other characteristic protected by law. The following characters cannot be used on this form (%,&amp;,/,?,&gt;,&lt;,|,{`{,}`})</p>
                <Card>
                    <form onSubmit={handleSubmit(showOtpScreen ? onSubmitOTP : onSubmit)}>
                        <TextInputField
                            ref={register({ minLength: 3, required: true })}
                            name='ApplyJobEmail'
                            label="Enter your email"
                            placeholder="Email"
                            marginTop='0.2em'
                            width='100%'
                            required
                        />
                        {showOtpScreen && <TextInputField
                            ref={register({ minLength: 3, required: true })}
                            name='otp'
                            label="OTP"
                            placeholder="Enter OTP"
                            marginTop='0.2em'
                            width='100%'
                            required
                        />}
                        <div className="btn-wrapper" >
                            <Button
                                appearance='primary'
                                intent='success'
                                marginTop='2em'
                                height={36}>
                                Submit
                            </Button>
                            {showOtpScreen && <Button
                                type="button"
                                appearance='primary'
                                intent='success'
                                marginTop='2em'
                                height={36}
                                onClick={() => sendOTP()} >
                                Resend OTP
                            </Button>}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
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