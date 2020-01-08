import 'moment';
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

const App = function () {
    const classes = useStyles()
    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleTitleChange = event => { setTitle(event.target.value) }
    const handleDateChange = date => { setSelectedDate(date._d) }

    const addEvent = () => {
        console.log(selectedDate)
        setEvents(
            [...events, {
                title: title,
                date: selectedDate
            }]
        )
    }

    return <div className={classes.root}>
        <Grid container spacing={1}>
            <Grid item xs={8}>
                <Paper className={classes.paper}>
                    <FullCalendar
                        events={events}
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin]} />
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <h1>Create new event!</h1>

                        <div>
                            <TextField onChange={handleTitleChange} value={title} margin="normal" label="Title" placeholder="eg. Go to doctor" variant="outlined" />
                        </div>

                        <div>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    variant="dialog"
                                    margin="normal"
                                    label="Event date"
                                    format="DD/MM/YYYY"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div>
                            <Button onClick={addEvent} size="large" margin="normal" variant="outlined" color="primary">Add Event</Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default App
