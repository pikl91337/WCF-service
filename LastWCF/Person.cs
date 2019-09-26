using System.Runtime.Serialization;

namespace LastWCF
{
    [DataContract]
    public abstract class Person
    {
        [DataMember]
        public abstract string LastName { get; set; }
        [DataMember]
        public abstract string MiddleName { get; set; }
        [DataMember]
        public abstract string FirstName { get; set; }
        [DataMember]
        public abstract string Gender { get; set; }
    }
}