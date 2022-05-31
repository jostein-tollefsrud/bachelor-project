import React from 'react';
import Paper from '@mui/material/Paper';
import { useAppContext } from '../../context/context';

// Material-UI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const OpeningHours = (props) => {
  const appContext = useAppContext();

  if (!appContext?.openingHours2?.attributes) {
    var title = 'Ingen info';
    var openingTimes = [''];
  } else {
    var { title, openingTimes } = appContext?.openingHours2?.attributes;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        backgroundColor: 'primary.light',
        padding: 4,
        paddingX: { sm: 8 },
        borderRadius: 3,
        maxWidth: '400px',
        margin: 'auto',
        top: '-2em',
        position: 'relative',
        // '@media only screen and (min-width: 1600px)': {
        //   position: 'absolute',
        //   top: '8em',
        //   right: 0,
        //   borderRadius: '1em 0 0 1em',
        //   textAlign: 'left',
        // },
      }}
    >
      <h2 className="h3-style">{title}</h2>
      <Table size="small" aria-label="åpningstider" sx={{ mt: 2 }}>
        <TableBody>
          {openingTimes?.map((opening) => (
            <TableRow
              key={opening.id}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'primary.dark',
                '&:last-of-type': {
                  borderBottom: 'none',
                },
              }}
            >
              <TableCell
                sx={{
                  border: 0,
                  p: 0,
                  py: { xs: '3px', sm: '7px' },
                  pr: 4,
                  color: 'black',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {opening.day}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  border: 0,
                  p: 0,
                  py: '3px',
                  color: 'black',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {opening.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={styles.listContainer}>
        <ul className={styles.singleListContainer}>
          {openingTimes.map((dayAndTime) => (
            <li key={dayAndTime.id}>{dayAndTime.day}</li>
          ))}
        </ul>
        <ul className={styles.singleListContainer}>
          {openingTimes.map((dayAndTime) => (
            <li key={dayAndTime.id}>{dayAndTime.time}</li>
          ))}
        </ul>
      </div> */}
    </Paper>
  );
};

export default OpeningHours;
