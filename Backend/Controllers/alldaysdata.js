import OrderManagement from "../model/OrderManagementdb.model.js";
import moment from 'moment';  // To work with dates easily

const alldaysdata = async (req, res) => {
  try {
    const dailyData = await OrderManagement.find();
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();


    let salesData = {};

    dailyData.forEach((order) => {
      if (order.DeliveredDate !== "Delivered Soon") {
        const deliveryDate = new Date(order.DeliveredDate);


        if (deliveryDate >= startOfWeek && deliveryDate <= endOfWeek) {
          const formattedDate = moment(deliveryDate).format('YYYY-MM-DD');


          if (!salesData[formattedDate]) {
            salesData[formattedDate] = { sale: 0, revenue: 0 };
          }


          salesData[formattedDate].sale += order.Product.length;
          salesData[formattedDate].revenue += order.TotalAmount;
        }
      }
    });

    const salesPerDay = Object.keys(salesData).map((date) => ({
      date,
      sale: salesData[date].sale,
      revenue: salesData[date].revenue,
    }));

    res.status(200).json({
      success: true,
      message: "Found",
      data: salesPerDay,
    });
  } catch (err) {
    console.error("Error fetching daily data:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
};

export default alldaysdata;
