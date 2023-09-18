import { Button, Select } from 'antd';

function App() {
    return (
        <>
            <Button onClick={() => console.log('clicked')} loading={true} shape={'round'}>
                Click Me
            </Button>
            <Select options={[{ value: 'Test', label: 'Test 1' }]} style={{ width: '100%' }} />
        </>
    );
}

export default App;
