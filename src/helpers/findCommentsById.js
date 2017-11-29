export function findCommentsById(venueId, currentComments){
  return currentComments.filter(comment => {
    return (comment.venue_id === venueId)
  })
}
