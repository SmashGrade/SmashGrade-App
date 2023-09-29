//import { OnboardingPage } from './pages/OnboardingPage';
//import React, { useState } from 'react';
import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { useState } from 'react';

function App() {
    //return <OnboardingPage />;

    useMsalAuthentication(InteractionType.Redirect);
    const [m_strUser, setm_strUser] = useState<string>('');

    function Render() {
        const { accounts } = useMsal();

        try {
            const username = accounts[0].username;
            setm_strUser(username);
        } catch (e) {
            console.log(e);
        }
    }

    if (m_strUser != '')
        return (
            <div className={'App'}>
                <div>User: {m_strUser}</div>
            </div>
        );
    else
        return (
            <>
                {Render()}
                <div>Please wait...</div>
            </>
        );
}

export default App;
