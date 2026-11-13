export class DeliveryController {
    static async getDeliveries(req, res, next) {
        try {
        return res.status(200).json({ status: 'success', payload: [] });
        } catch (error) {
        next(error);
        }
    }
}