import model from '../models';

const { request } = model;

class Requests {
  static create(req, res) {
    const { departureDate, returnDate, travelingReason, status, type, handledBy, tripId } = req.body
    const { id } = req.params
    return request
      .create({
        departureDate,
        returnDate,
        travelingReason,
        status,
        type,
        handledBy,
        tripId

      })
      .then(request => res.status(201).send({
        message: `Trip request succesfully`,
        request
      }))
    }
    static list(req, res) {
        return Request
          .findAll()
          .then(requests => res.status(200).send(requests));
      }
      static modify(req, res) {

        const { departureDate, returnDate, travelingReason } = req.body
        const { id } = req.params
        return Request
          .findById(req.params.requestId)
          .then((request) => {
              if(request.status !== "Pending"){
                  res.status(400).send({
                      message: "You can't not update approved/ rejected Request "
                  })

              }
            request.update({
              departureDate: departureDate || request.departureDate,
              returnDate: returnDate || request.returnDate,
              travelingReason: travelingReason || request.travelingReason
            })
            .then((updatedRequest) => {
              res.status(200).send({
                message: 'Request updated successfully',
                data: {
                    departureDate: departureDate || updatedRequest.departureDate,
                    returnDate: returnDate || updatedRequest.returnDate,
                    travelingReason: travelingReason || updatedRequest.travelingReason
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
      static delete(req, res) {
        return Request
          .findById(req.params.requestId)
          .then(request => {
            if(!request) {
              return res.status(400).send({
              message: 'Reqyest Not Found',
              });
            }
            return request
              .destroy()
              .then(() => res.status(200).send({
                message: 'Request successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
}

export default Requests