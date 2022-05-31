import React from 'react';

// Material-UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import GridItem from '../GridItem/GridItem';

const { API_URL } = process.env;

function EmployeeCard({ employee }) {
  const { alternativeText, url } =
    employee.attributes.profilePicture.data.attributes;

  return (
    <GridItem>
      <Card elevation={8} sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="250"
          image={`${API_URL}${url}`}
          alt={alternativeText}
        />
        <CardContent>
          <h3>{employee.attributes.role}</h3>
          <p>{employee.attributes.name}</p>
          <p>
            <a
              style={{
                padding: '.4em 0',
                marginTop: '1em',
                display: 'inline-block',
              }}
              href={`tel:${employee.attributes.mobileNumber}`}
            >{`Tlf: ${employee.attributes.mobileNumber}`}</a>
          </p>
          <p>
            <a
              style={{ padding: '.4em 0', display: 'inline-block' }}
              href={`mailto:${employee.attributes.email}`}
            >
              {employee.attributes.email}
            </a>
          </p>
        </CardContent>
      </Card>
    </GridItem>
  );
}

export default EmployeeCard;
