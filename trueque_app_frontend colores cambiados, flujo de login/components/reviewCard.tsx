import { Paper, Rating, Stack, Typography } from '@mui/material'

const ReviewCard = ({ review }) => {
  return (
    <Paper elevation={3} key={review.code}>
      <Stack direction="column" alignSelf="start" spacing={3} my={2} mx={2}>
        <Typography variant="subtitle2" align="left">
          {review.tittle}
        </Typography>
        <Rating name="read-only" value={review.qualification} readOnly />
        <Typography variant="subtitle2" align="left">
          {review.description}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default ReviewCard
