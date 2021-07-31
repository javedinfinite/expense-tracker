import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Expense() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [expenses, setExpenses] = React.useState([])

  const [input, setInput] = React.useState('')
  const [balance, setbalance] = React.useState(0)

  const addTransaction = (type) =>{
      if(input=='' || input==null || input==0)
        return
      const timeStamp = new Date().toISOString()
      if(type=='add'){
        setExpenses(expenses.concat({type:'Add', amount:input, timestamp:timeStamp}))
        setbalance(parseInt(balance)+input)
      }
      else if(type=='remove'){
        setExpenses(expenses.concat({type:'Remove', amount:input, timestamp:timeStamp}))
        setbalance(parseInt(balance)-input)
      }
  }

  const validateKey = (event) =>{
    var key = window.event ? event.keyCode : event.which;
 
    if (event.keyCode === 8 || event.keyCode === 46
        || event.keyCode === 37 || event.keyCode === 39) {
        return true;
    } else if (key < 48 || key > 57 || event.shiftKey) {
        return false;
    } else { return true; }
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
    <Card className={classes.root} style={{backgroundColor: 'aliceblue'}}>
      <CardContent>
 
        <Typography variant="h3" component="h2" style={{textAlign:'center'}}>
         Expense Tracker - Basic
        </Typography>
        <Card className={classes.root} style={{marginTop:'4%'}}>
          <CardContent style={{textAlign:'center' }}>
    
            <Typography variant="h5" component="h2" style={{marginBottom:'3%'}} >
                Balance : {balance}
            </Typography>
            <Typography  style={{marginBottom:'3%'}}>
              <TextField  
                  id="standard-number"
                
                  onKeyDown={(e)=>{if(!validateKey(e)){e.preventDefault()}}}
                  label="Number"
                  type="number"
                  onChange={(e)=>setInput(parseInt(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
            </Typography>
            <Button onClick={()=>addTransaction('add')} size="small" variant="contained" color="primary" className={classes.margin}>
              Add
            </Button>
            <Button onClick={()=>addTransaction('remove')} size="small" variant="contained" color="secondary" className={classes.margin}>
              Remove
            </Button>
    
          </CardContent>
    
        </Card>
        <Card className={classes.root} style={{marginTop:'2%'}}>
        <Typography variant="h5" component="h2" style={{padding:'2%'}}>
                <b>Transactions:</b>
            </Typography>
          <CardContent style={{ maxHeight:'200px', overflow: 'auto'}} >
    

     
            <Typography variant="h6" component="h2" style={{marginTop:'0%'}}>
            {expenses.map((object)=>(
                   <p style={{margin:'0%'}}>{object.timestamp} - <span style={{color:object.type=='Add'? '#3f51b5':'#f50057'}}>{object.amount} - {object.type}</span> </p>
            ))}
            </Typography>
    
          </CardContent>
    
        </Card>
      </CardContent>
 
    </Card>

    </Container>
  );
}
