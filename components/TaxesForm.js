import { Button, Form, FormLayout, TextField, Stack, Select, Toast } from "@shopify/polaris";
import { useState } from "react";
import * as calc from './calc/Calc';
import { getActivityType } from "./cloudFirestore/ActivityType";
import WriteToCloudFirestore from "./cloudFirestore/Write";
import { auth } from '../firebase/initFirebase'

export default function FormOnSubmitExample() {
    const [earnings, setEarnings] = useState('');
    const [earningsErrorMsg, setEarningsErrorMsg] = useState('');
    const [expenses, setExpenses] = useState('');
    const [expensesErrorMsg, setExpensesErrorMsg] = useState('');
    const [activityType, setActivityType] = useState(null)
    const [year, setYear] = useState('');
    const [yearErrorMsg, setYearErrorMsg] = useState('');
    const [active, setActive] = useState(false);

    const handleEarningsChange = (value) => setEarnings(value);
    const handleExpensesChange = (value) => setExpenses(value);
    const handleYearChange = (value) => setYear(value);

    const fieldValidationErrorMsg = 'This field is required';

    const handleSubmit = async () => {
      if(earnings == '' || expenses == '' || year == '' ){
        if(earnings == ''){
          setEarningsErrorMsg(fieldValidationErrorMsg);
          setTimeout(() => { setEarningsErrorMsg('') }, 5000);
        }
        if(expenses == ''){
          setExpensesErrorMsg(fieldValidationErrorMsg);
          setTimeout(() => { setExpensesErrorMsg('') }, 5000);
        }
        if(year == ''){
          setYearErrorMsg(fieldValidationErrorMsg);
          setTimeout(() => { setYearErrorMsg('') }, 5000);
        }
      }else{
        await getDBActivityType(auth.currentUser.email);
        await setEarnings('');
        await setExpenses('');
        const result = getResult(activityType);
        WriteToCloudFirestore(year, earnings, result.taxes, result.guadagnoPuro);
        setActive(true);
      }
    };

    const getDBActivityType = async (userEmail) => {
      const dbActivityType = await getActivityType(userEmail)
      setActivityType(dbActivityType);
    }
    const getResult = (activityType) => {
      let result;
      switch(activityType){
        case 'societa-di-capitali':
          result = calc.societaDiCapitali(earnings, expenses);
          break;
        case 'societa-di-persone':
          result = calc.societaDiPersone(earnings, expenses);
          break;
        case 'partita-iva-ordinaria':
          result = calc.partitaIVAOrdinaria(earnings, expenses);
          break;
        case 'partita-iva-forfettaria':
          result = calc.partitaIVAForfettaria(earnings, expenses);
          break;
      }
      return result;
    }

    const years = [
      {label: '2000', value: '2000'},
      {label: '2001', value: '2001'},
      {label: '2002', value: '2002'},
      {label: '2003', value: '2003'},
      {label: '2004', value: '2004'},
      {label: '2005', value: '2005'},
      {label: '2006', value: '2006'},
      {label: '2007', value: '2007'},
      {label: '2008', value: '2008'},
      {label: '2009', value: '2009'},
      {label: '2010', value: '2010'},
      {label: '2011', value: '2011'},
      {label: '2012', value: '2012'},
      {label: '2013', value: '2013'},
      {label: '2014', value: '2014'},
      {label: '2015', value: '2015'},
      {label: '2016', value: '2016'},
      {label: '2017', value: '2017'},
      {label: '2018', value: '2018'},
      {label: '2019', value: '2019'},
      {label: '2020', value: '2020'},
      {label: '2021', value: '2021'}
    ];

    return (
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Stack>
            <Stack.Item fill>
              <TextField
                value={earnings}
                onChange={handleEarningsChange}
                label="Earnings"
                type="number"
                prefix="$"
                error={earningsErrorMsg}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                value={expenses}
                onChange={handleExpensesChange}
                label="Expenses"
                type="number"
                prefix="$"
                error={expensesErrorMsg}
              />
            </Stack.Item>
          </Stack>
          <Stack>
            <Stack.Item fill>
              <Button
                submit
                primary
                fullWidth={true}
              >
                Submit
              </Button>
            </Stack.Item>
            <Stack.Item fill>
              <Select
                //label="Year"
                options={years}
                onChange={handleYearChange}
                value={year}
                placeholder="Year"
                error={yearErrorMsg}
              />
            </Stack.Item>
          </Stack>
        </FormLayout>
        { active && <Toast content="Record added successfully" onDismiss={() => setActive(false)} /> }
      </Form>
    );
  }