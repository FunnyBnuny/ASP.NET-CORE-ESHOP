namespace ESHOP.Server.Models;

public class OrderDto
{
    public int Id { get; set; }
    public string? OrderNumber { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public string ProductName { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

public class AddToCartDto
{
    public int ProductVariantId { get; set; }
    public int Quantity { get; set; }
}

public class CheckoutDto
{
    public int ShippingAddressId { get; set; }
    public int BillingAddressId { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public decimal ShippingAmount { get; set; }
    public decimal TaxAmount { get; set; }
}

public class UpdateOrderStatusDto
{
    public string Status { get; set; } = string.Empty;
}