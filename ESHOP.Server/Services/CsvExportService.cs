using System.Text;
using ESHOP.Core.Models;

namespace ESHOP.Server.Services;

public class CsvExportService
{
    public byte[] ExportOrdersToCsv(IEnumerable<Order> orders)
    {
        var sb = new StringBuilder();
        sb.AppendLine("OrderId,OrderNumber,Status,CreatedAt,TotalAmount,UserEmail");

        foreach (var order in orders)
        {
            var email = order.User?.email ?? "guest";
            sb.AppendLine($"{order.id},{order.order_number},{order.order_status},{order.created_at:yyyy-MM-dd HH:mm},{order.total_amount},{email}");
        }
        return Encoding.UTF8.GetBytes(sb.ToString());
    }
}