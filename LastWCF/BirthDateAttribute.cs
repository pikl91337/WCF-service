using System;

namespace LastWCF
{
    [AttributeUsage(AttributeTargets.Property)]
    public class BirthDateAttribute : System.Attribute
    {
        public string Date { get; set; }


        public BirthDateAttribute(string date)
        {
            Date = date;
        }
    }
}