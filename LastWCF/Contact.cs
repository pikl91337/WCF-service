using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace LastWCF
{
    [DataContract]
    [ClassDescript(Description = "Контакт")]
    public sealed class Contact : Person, ICloneable
    {
        private string _LastName;
        private string _FirstName;
        private string _MiddleName;
        private string _Gender;
        private string _PhoneNumber;
        private int _ID;

        //private Contact() { }
        public Contact() { }
        public Contact(string firstName, string middleName, string lastName, int inn, string birthdayDate, string gender, string phoneNumber)
        {
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            Inn = inn;
            BirthdayDate = birthdayDate;
            Gender = gender;
            PhoneNumber = phoneNumber;

        }
        public Contact(int id, string firstName, string middleName, string lastName, int inn, string birthdayDate, string gender, string phoneNumber)
        {
            ID = id;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            Inn = inn;
            BirthdayDate = birthdayDate;
            Gender = gender;
            PhoneNumber = phoneNumber;

        }

        private string _BirthDate;

        [DataMember]
        public int ID
        {
            get
            {
                return _ID;
            }
            set
            {
                _ID = value;
            }
        }
        [DataMember]
        public override string FirstName
        {
            get
            {
                return _FirstName;
            }
            set
            {
                _FirstName = value;
            }
        }
        [DataMember]
        public override string MiddleName
        {
            get
            {
                return _MiddleName;
            }
            set
            {
                _MiddleName = value;
            }
        }
        [DataMember]
        public override string LastName
        {
            get
            {
                return _LastName;
            }
            set
            {
                if (value != null && value.Length >= 2)
                {
                    _LastName = value;
                }
                else
                {
                    throw new ArgumentException("Длина должна быть не меньше 3-х символов");
                }

            }
        }
        [DataMember]
        public override string Gender
        {
            get
            {
                return _Gender;
            }
            set
            {
                _Gender = value;
            }
        }
        [DataMember]
        public string PhoneNumber
        {
            get
            {
                return _PhoneNumber;
            }
            set
            {
                _PhoneNumber = value;
            }
        }

        [DataMember]
        [BirthDate("31/12/1900")]
        public string BirthdayDate
        {
            get
            {
                return _BirthDate;
            }
            set
            {
                _BirthDate = value;

            }
        }
        [DataMember]
        public int Inn
        {
            get; set;
        }
        public string JobPosition
        {
            get; set;
        }

        public object Clone()
        {
            return new Contact()
            {
                FirstName = this.FirstName,
                MiddleName = this.MiddleName,
                LastName = this.LastName,
                BirthdayDate = this.BirthdayDate,
                Inn = this.Inn,
                JobPosition = this.JobPosition,
            };

        }

    }

    public interface ICloneable
    {
        object Clone();
    }
}