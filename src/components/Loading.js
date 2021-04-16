import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

function TypographyDemo() {
    return (
        <div>

            <Typography component="div" variant="h3">
                <Skeleton />
            </Typography>

        </div>
    );
}

TypographyDemo.propTypes = {
    loading: PropTypes.bool,
};

export default function SkeletonTypography() {
    return (
        <Grid spacing={7}>
            <Grid item xs>
                <TypographyDemo loading />
            </Grid>
        </Grid>
    );
}
