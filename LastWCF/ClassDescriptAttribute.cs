using System;

namespace LastWCF
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ClassDescriptAttribute : System.Attribute
    {
        public string Description
        {
            get; set;
        }
    }
}