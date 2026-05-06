namespace ESHOP.Server.Models;

public class AddressDto
{
    public int Id { get; set; }
    public string AddressLine1 { get; set; } = string.Empty;
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = string.Empty;
    public string? State { get; set; }
    public string PostalCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public bool IsDefaultShipping { get; set; }
    public bool IsDefaultBilling { get; set; }
}

public class CreateAddressDto
{
    public string AddressLine1 { get; set; } = string.Empty;
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = string.Empty;
    public string? State { get; set; }
    public string PostalCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public bool IsDefaultShipping { get; set; }
    public bool IsDefaultBilling { get; set; }
}

public class UpdateAddressDto : CreateAddressDto { }