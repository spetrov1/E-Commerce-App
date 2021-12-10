package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "city")
    String city;

    @Column(name = "country")
    String country;

    @Column(name = "state")
    String state;

    @Column(name = "street")
    String street;

    @Column(name = "zip_code")
    String zipCode;

    @OneToOne // TODO try @OneToMany, according to the reverse engineer result diagram it should be OneToMany
    @PrimaryKeyJoinColumn
    Order order;
}
