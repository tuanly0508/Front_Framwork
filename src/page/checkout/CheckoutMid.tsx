import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

export default function CheckoutMid() {
    return (
        <div className='checkout-mid'>
            <p className='check-out-left-title'>Payment</p>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group" >
                    <FormControlLabel sx={{border:'1px solid wheat',margin:'10px 0',padding:'6px 70px 6px 10px'}} value="female" control={<Radio />} label="Payment on delivery" />
                    <FormControlLabel sx={{border:'1px solid wheat',margin:'10px 0',padding:'6px 70px 6px 10px'}} value="male" control={<Radio />} label="Payment on zalo-pay" />
                    <FormControlLabel sx={{border:'1px solid wheat',margin:'10px 0',padding:'6px 70px 6px 10px'}} value="other" control={<Radio />} label="Payment on Vietcombank" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}
